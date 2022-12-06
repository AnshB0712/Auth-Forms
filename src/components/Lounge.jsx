import { Link } from "react-router-dom";

const Lounge = () => {
  return (
    <section>
      <h1>Editors and Admin can come here!</h1>
      <br />
      <p>You must be an Editor or Admin.</p>
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default Lounge;
