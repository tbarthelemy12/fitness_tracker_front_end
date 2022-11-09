import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth, useActivities } from "../custom-hooks";

export default function EditActivity() {
  const history = useHistory();
  const { search } = useLocation();
  const { activities } = useActivities();
  const searchObject = new URLSearchParams(search);
  const name = searchObject.get("name");
  const description = searchObject.get("description") || "(none currently)";
  const activityId = searchObject.get("id");

  const { token } = useAuth();


  const [form, setForm] = useState({
    name: name,
    description: description,
  });

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
        const response = await fetch(
          `http://localhost:3000/api/activities/${activityId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        const { id } = await response.json();

        if (id) {
          
          history.push("/activities");
        } else {
          throw new Error("error editing activity");
        }
      } catch (error) {
        console.error(error);
      }
    }

    success = true;
  }

  return (
    <section>
      <h4 className="editsHeader">
        Make your changes below, then click "Save Changes".
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="nameInput">
          <label style={{ marginRight: 5 + "px" }}>Activity Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="descriptionInput">
          <label style={{ marginRight: 5 + "px" }}>Item Description:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Save Changes"
          className="editActivityButton"
        />
      </form>
    </section>
  );
}