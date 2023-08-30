import { useState } from "react";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import PasswordStrengthIndicator from "./components/PasswordStrengthIndicator";
import Button from "./components/Button";

function App() {
  const initialData = [
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ];

  const [length, setLength] = useState(4);
  const [checkBoxData, setCheckBoxData] = useState(initialData);
  const [copy, setCopy] = useState(false);

  const checkBoxHandler = (index) => {
    const updatedData = [...checkBoxData];
    updatedData[index].state = !updatedData[index].state;
    setCheckBoxData(updatedData);
  };

  const { password, errorMessage, generatePassord } = usePasswordGenerator();

  return (
    <div className="container">
      <h1>Password Generator</h1>
      {password && (
        <div className="header">
          <div className="title">{password}</div>

          <Button
            cssClass={"copyBtn"}
            text={copy ? "Copied" : "Copy"}
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopy(true);
              setTimeout(() => setCopy(false), 1000);
            }}
          />
        </div>
      )}
      <div className="charLength">
        <span>
          <label>Charachter Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="6"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <div className="checkboxes">
        {checkBoxData.map((checkBox, index) => {
          return (
            <div key={index} onClick={() => checkBoxHandler(index)}>
              <input type="checkbox" checked={checkBox.state} />
              <label>{checkBox.title}</label>
            </div>
          );
        })}
      </div>

      <PasswordStrengthIndicator password={password} />

      {errorMessage && <div className="errorMessage">⚠️ {errorMessage}</div>}

      <Button
        cssClass={"generateBtn"}
        text={"Genrate Password"}
        onClick={() => generatePassord(checkBoxData, length)}
      />
    </div>
  );
}

export default App;
