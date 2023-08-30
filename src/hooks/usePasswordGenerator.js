import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassord = (checkBoxData, length) => {
    let charSet = "";
    let generatedPassord = "";

    const selectedOption = checkBoxData.filter(
      (checkbox) => checkbox.state === true
    );

    if (selectedOption.length === 0) {
      setErrorMessage("Select at least one option");
      setPassword("");
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charSet += "0123456789";
          break;
        case "Include Symbols":
          charSet += "!@#$%^&*()_+";
          break;
        default:
          break;
      }
    });

    for (let index = 0; index < length; index++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassord += charSet[randomIndex];
    }

    setPassword(generatedPassord);
    setErrorMessage("");
  };
  return { password, errorMessage, generatePassord };
};

export default usePasswordGenerator;
