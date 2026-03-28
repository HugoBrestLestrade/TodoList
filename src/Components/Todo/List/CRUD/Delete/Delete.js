import { useContext } from 'react';
import { ListContext } from '../../ListContext';
import data from './../../../../../data.json'; {/* Ptetre a enlever pour respecter le ListContext.js, et du coup faudra enlever aussi le RevenirJson au passage*/}

export default function Reset() {
  const { setList } = useContext(ListContext);

  return (
    <>
        <button onClick={() => setList([])}>
        Partir de 0
        </button>
        <RevenirJson/>
    </>

  );
}

function RevenirJson() {
  const {List,  setList } = useContext(ListContext);

  return (
    <button onClick={() => setList(data.tasks)}>
      Revenir au fichier JSON
    </button>
  );
}