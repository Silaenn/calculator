import React from "react";
import arrow from "../assets/images/arrow.gif";

const HomePage = () => {
  return (
    <div className="w-100 min-vh-100">
      <header
        className="inti"
        style={{
          marginTop: "120px",
        }}
      >
        <div className="d-flex justify-content-center mb-2">
          <h2 className="judul">Kalkulator Online</h2>
        </div>

        <div className="d-flex justify-content-center">
          <div className="tempat ">
            <div className="mt-3 dalam d-flex w-100 justify-content-center p-3 mb-2">
              <input type="text" className="input" />
            </div>

            <div className="calculator">
              <div className="">
                <button>7</button>
                <button>4</button>
                <button>1</button>
                <button>0</button>
              </div>

              <div>
                <button>8</button>
                <button>5</button>
                <button>2</button>
                <button
                  className="operator"
                  style={{
                    backgroundColor: "#638889",
                  }}
                >
                  .
                </button>
              </div>

              <div>
                <button>9</button>
                <button>6</button>
                <button>3</button>
                <button
                  className="operator"
                  style={{
                    backgroundColor: "#638889",
                  }}
                >
                  =
                </button>
              </div>

              <div>
                <button
                  style={{
                    backgroundColor: "#638889",
                  }}
                >
                  X
                </button>
                <button
                  style={{
                    backgroundColor: "#638889",
                  }}
                >
                  %
                </button>
                <button
                  className="operator"
                  style={{
                    backgroundColor: "#638889",
                  }}
                >
                  -
                </button>
                <button
                  className="operator"
                  style={{
                    backgroundColor: "#638889",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="tipe justify-content-center d-flex">
          <div className="jenis">
            <div>
              <h4>Matematika</h4>
            </div>

            <div className="ket ">
              <div className=" but-cal">
                <button className="buttoncal">
                  Kalkulator Persen
                  <img src={arrow} alt="" className="ms-2" width={34} />
                </button>
              </div>

              <div className=" but-cal">
                <button className="buttoncal">
                  Kalkulator Persen
                  <img src={arrow} alt="" className="ms-2" width={34} />
                </button>
              </div>

              <div className=" but-cal">
                <button className="buttoncal">
                  Kalkulator Persen
                  <img src={arrow} alt="" className="ms-2" width={34} />
                </button>
              </div>

              <div className=" but-cal">
                <button className="buttoncal">
                  Kalkulator Persen
                  <img src={arrow} alt="" className="ms-2" width={34} />
                </button>
              </div>

              {/* <div className=" but-cal">
                <button className="buttoncal">
                  Kallkulator Persen
                  <img src={arrow} alt="" className="ms-3" width={30} />
                </button>
              </div> */}

              {/* <div className=" but-cal">
                <button className="buttoncal">
                  Kallkulator Persen
                  <img src={arrow} alt="" className="ms-3" width={30} />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
