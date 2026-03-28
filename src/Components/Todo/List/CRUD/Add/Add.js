import { useState, useContext } from 'react';
import { ListContext } from '../../ListContext';

export default function AddTask() {
  const [text, setText] = useState('');
  const { list, setList } = useContext(ListContext);
  console.log("AddTask context :", useContext(ListContext));
  return (
    <>
      <input
        placeholder="Ajouter une tâche"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setList([...list, { id: Date.now(), title: text, etat: "Nouveau" }]);
        setText('');
      }}>
        Ajouter une tâche
      </button>
    </>
  );
}