import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import request from "../request";
import styles from "./Edit.module.css";
import Button from "./Button";
import { useNotifications } from "./Notifications";

function AccountForm({ account, onSave, disabled, onDelete }) {
  const [changes, setChanges] = useState({});

  function changeField(field, value) {
    setChanges({
      ...changes,
      [field]: value,
    });
  }

  const formData = {
    ...account,
    ...changes,
  };

  function handleSubmit(event) {
    event.preventDefault();
    onSave(changes);
  }

  return (
    <form autoComplete={"off"} onSubmit={handleSubmit} className={styles.form}>
      <fieldset disabled={disabled ? "disabled" : undefined}>
        <div className={styles.formRow}>
          <label htmlFor="name">Name</label>
          <input
            required
            id={"name"}
            type={"string"}
            value={formData.name}
            onChange={(event) => changeField("name", event.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="number">Number</label>
          <input
            required
            id={"number"}
            type={"string"}
            value={formData.number}
            onChange={(event) => changeField("number", event.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="balance">Balance</label>
          <input
            disabled
            id={"balance"}
            type={"number"}
            value={formData.balance || 1000}
            onChange={(event) => changeField("balance", event.target.value)}
          />
        </div>
      </fieldset>

      <div className={styles.formFooter}>
        {account && account.id && (
          <Button action={onDelete} kind={"danger"} disabled={disabled}>
            Delete
          </Button>
        )}
        <Button
          type={"submit"}
          disabled={Object.keys(changes).length === 0 || disabled}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

const defaultAccountData = {
  balance: 1000,
  name: "",
  number: "",
};

function AccountEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [account, setAccount] = useState(id ? null : defaultAccountData);
  const [loadingStatus, setLoadingStatus] = useState(id ? "loading" : "loaded");
  const [isSaving, setSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const { notifyError } = useNotifications();

  useEffect(
    function () {
      async function loadAccount() {
        try {
          const response = await request(`/accounts/${id}`, {
            method: "GET",
          });
          if (response.ok) {
            setAccount(response.body);
            setLoadingStatus("loaded");
          } else {
            setLoadingStatus("error");
          }
        } catch (error) {
          setLoadingStatus("error");
        }
      }

      if (id) {
        loadAccount();
      }
    },
    [id]
  );

  async function handleSave(changes) {
    try {
      setSaving(true);
      const url = account && account.id ? `/accounts/${account.id}` : "/accounts";
      const method = account && account.id ? "PATCH" : "POST";
      const body = account && account.id ? changes : { ...defaultAccountData, ...changes };
      const response = await request(url, {
        method,
        body,
      });
      if (response.ok) {
        setAccount(response.body);
      } else {
        notifyError("Failed to save account. Please try again");
      }
    } catch (error) {
      notifyError(
        "Failed to save account. Please check your internet connection"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const response = await request(`/accounts/${account.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        history.push("/accounts");
      } else {
        notifyError("Failed to delete account. Please try again");
      }
    } catch (error) {
      notifyError(
        "Failed to delete account. Please check your internet connection"
      );
    } finally {
      setDeleting(false);
    }
  }

  let content;
  if (loadingStatus === "loading") {
    content = <LoadingIndicator />;
  } else if (loadingStatus === "loaded") {
    content = (
      <AccountForm
        key={account.updated_at}
        account={account}
        onSave={handleSave}
        disabled={isSaving || isDeleting}
        onDelete={handleDelete}
      />
    );
  } else if (loadingStatus === "error") {
    content = <ErrorMessage />;
  } else {
    throw new Error(`Unexpected loadingStatus: ${loadingStatus}`);
  }

  return <div>{content}</div>;
}

export default AccountEdit;
