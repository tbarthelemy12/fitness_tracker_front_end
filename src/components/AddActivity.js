import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth, useMe, useActivities } from "../custom-hooks";

export default function AddActivity() {
  const history = useHistory();
  const { meData } = useMe();
 
  const { activities } = useActivities();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const { token } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let success = true;

    
    for (let i = 0; i < activities.length; i++) {
      if (form.name === activities[i].name) {
        window.alert(
          "Oops, this activity's name matches another one in the activity list! Please choose a different name."
        );
        success = false;
      }
    }

    if (success) {
      try {
        const response = await fetch(`http://localhost:3000/api/activities`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const { id } = await response.json();

        if (id) {
          
          history.push("/activities");
        } else {
          throw new Error("error creating activity");
        }
      } catch (error) {
        console.error(error);
      }
    }

    success = true;
  }

  return (
    <main className="addActivityInputs">
      <h3 className="addActivityHeader">Create Custom Routine</h3>

      <form onSubmit={handleSubmit}>
        <div className="nameInput">
          <label style={{ marginRight: 5 + "px" }}>
            Name of Your Activity:
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="descriptionInput">
          <label style={{ marginRight: 5 + "px" }}>
            What is the goal of this routine?
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Save Activity"
          className="addActivityButton"
        />
      </form>
    </main>
  );
}