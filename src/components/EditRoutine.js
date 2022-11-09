import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function EditRoutine() {
  const history = useHistory();
  const { search } = useLocation();

  const searchObject = new URLSearchParams(search);
  const name = searchObject.get("name");
  const goal = searchObject.get("goal");
  const isPublic = searchObject.get("isPublic");
  const creatorId = searchObject.get("creatorId");
  const routineId = searchObject.get("id");

  const { token } = useAuth();

  const [form, setForm] = useState({
    name: name,
    goal: goal,
    isPublic: isPublic,
    creatorId: creatorId,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("sent form:", form);

    try {
      const response = await fetch(
        `http://localhost:3000/api/routines/${routineId}`,
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
        console.log(`Routine #${routineId} was successfully edited.`);
        history.push("/myroutines");
      } else {
        throw new Error("error editing routine");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <h4 className="editsHeader">
        Make your changes below, then click "Save Changes".
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="nameInput">
          <label style={{ marginRight: 5 + "px" }}>Routine Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="goalInput">
          <label style={{ marginRight: 5 + "px" }}>Goal:</label>
          <input
            type="text"
            name="goal"
            value={form.goal}
            onChange={handleChange}
          />
        </div>
        <div className="isPublicInput">
          <label style={{ marginRight: 5 + "px" }}>
            Should this routine be public?
          </label>
          <input
            type="text"
            name="isPublic"
            value={form.isPublic}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Save Changes"
          className="editRoutineButton"
        />
      </form>
    </section>
  );
}