import { ALL, ACTIVE, COMPLETED } from "../constants";
const CLEAR_COMPLETED = "Clear Completed";
const itemsString = (amount) => `${amount} items left`;
const Navbar = ({ filterHandler, clearHandler, counter }) => (
  <div className="navbar">
    <div className="remaining navbar-item">{itemsString(counter)}</div>
    <div className="filters navbar-item">
      <button onClick={() => filterHandler(ALL)}>{ALL}</button>
      <button onClick={() => filterHandler(ACTIVE)}>{ACTIVE}</button>
      <button onClick={() => filterHandler(COMPLETED)}>{COMPLETED}</button>
    </div>
    <div className="navbar-item">
      <button onClick={clearHandler}>{CLEAR_COMPLETED}</button>
    </div>
  </div>
);

export default Navbar;
