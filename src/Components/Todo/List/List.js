import Read from './CRUD/Read/Read';
import AddTask from './CRUD/Add/Add';
import Reset from './CRUD/Delete/Delete';

function ListJson() {
    return (
        <>
            {/*<AddTask /> */}
            <Reset />
            <Read />
        </>
    );
}

export default ListJson;