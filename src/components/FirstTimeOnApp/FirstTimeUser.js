import React from "react";
import styled from "styled-components";

export default function DayLogAccordion() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
        <h2>Jesteś pierwszy raz w aplikacji JedeMaster</h2>
        <p>Żeby przejść dalej musisz odpowiedzieć na następujące pytania lub wybrać gotowy challange, którego chcesz się podjąć</p>
        <ul>
            <li>1. Ćwiczenia</li>
            <li>2. Nawyki finansowe</li>
            <li>3. Wyjście z przegrywu</li>
            <li>4. Dieta</li>
            <li>5. Rozwój mózgu</li>
        </ul>
    </div>
  );
}
