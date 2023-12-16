import HatForm from "./HatForm";
import ShoeForm from "./ShoeForm";


function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">WARDROBIFY!</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Need to keep track of your shoes and hats? We have
          the solution for you!
        </p>
      </div>

      <div className="container text-center">
        <div className="row">
          <div className="col">
            <ShoeForm />
          </div>
          <div className="col">
            <HatForm />
          </div>

        </div>
      </div>
    </div>
  );
}

export default MainPage;
