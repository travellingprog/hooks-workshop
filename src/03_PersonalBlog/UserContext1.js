import React, { useState } from 'react';

export const UserContext = React.createContext({});
UserContext.displayName = 'UserContext';

export function UserProvider({ children }) {
  const [name, setName] = useState('Anon1');
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);

  return (
    <UserContext.Provider value={{
      name,
      setName,
      birthMonth,
      setBirthMonth,
      birthDay,
      setBirthDay,
    }}>
      { children }
    </UserContext.Provider>
  );
}
