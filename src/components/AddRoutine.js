import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth, useMe } from "../custom-hooks";

export default function AddRoutine() {
  const history = useHistory();
  const { meData } = useMe();

  const [form, setForm] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });
  const { token } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(form);

    try {
      const response = await fetch(`http://localhost:3000/api/routines`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, creatorId: meData.id }),
      });

      const { creatorId, name } = await response.json();

      if (creatorId) {
        // console.log(
        //   `Success! You, creatorId #${creatorId}, made the routine named "${name}".`
        // );
        history.push("/myroutines");
      } else {
        throw new Error("error creating routine");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="addRoutineInputs">
      <h3 className="addRoutineHeader">Create Custom Routine</h3>

      <form onSubmit={handleSubmit}>
        <label>Your Creator ID: {meData.id}</label>
        <div className="nameInput">
          <label style={{ marginRight: 5 + "px" }}>Name of Your Routine:</label>
          <input
            type="text"
            name="name"
            value={form.name} //"'value' prop on 'input' should not be null. Consider using an empty string to clear the component or 'undefined' for uncontrolled components."
            onChange={handleChange}
          />
        </div>
        <div className="goalInput">
          <label style={{ marginRight: 5 + "px" }}>
            What is the goal of this routine?
          </label>
          <input
            type="text"
            name="goal"
            value={form.goal}
            onChange={handleChange}
          />
        </div>
        <div className="isPublicInput">
          <label style={{ marginRight: 5 + "px" }}>
            Would you like to make this routine public?
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
          value="Save Routine"
          className="addRoutineButton"
        />
      </form>
    </main>
  );
}