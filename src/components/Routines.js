import React from "react";
import { useRoutines, useMe } from "../custom-hooks";
import { NavLink } from "react-router-dom";

export default function Routines() {
  const { routines } = useRoutines();
  const { meData } = useMe();


  return !routines ? (
    <main className="routinesList">
      <div>Sorry, no routines have been created! Check back later.</div>
    </main>
  ) : (
    <main className="routinesList">
      <NavLink
        key="2"
        to="/newroutine"
        className="createNewRoutineButton"
       
      >
        Create New Routine
      </NavLink>
      {routines.map((routine) => {
        return (
          <section className="eachRoutine" key={routine.id}>
            {}
            <p>Routine ID #{routine.id}</p>
            <h2>{routine.name}</h2>
            <p>Goal: {routine.goal}</p>
            <p>Created by: {routine.creatorName}</p>
            <p style={{ textDecoration: "underline" }}>Activities</p>
            <div>
              {routine.activities.map(
                ({ name, description, count, duration, id }) =>
                  id ? (
                    <ul>
                      {}
                      <li key={id}>
                        Do {name} - {description} - {count} times for {duration}{" "}
                        minutes
                      </li>
                    </ul>
                  ) : (
                    "There are no activities for this routine."
                  )
              )}
            </div>
            <p>
              {routine.creatorId === meData.id ? (
                <NavLink
                  key="1"
                  to={`/editroutine/?name=${routine.name}&goal=${routine.goal}&isPublic=${routine.isPublic}&creatorId=${routine.creatorId}&id=${routine.id}`}
                  className="editActivityButtonforall"
                >
                  Edit My Routine
                </NavLink>
              ) : null}
            </p>
          </section>
        );
      })}
    </main>
  );
}