import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';



function HatPage(props) {
  const [hatColumns, setHatColumns] = useState([[], [], []]);

  async function getHats() {
    const url = 'http://localhost:8090/api/hats/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const requests = [];
        for (let hats of data.hats) {
          const hatUrl = `http://localhost:8090/api/hats/${hats.id}`;
          requests.push(fetch(hatUrl));
        }

        const responses = await Promise.all(requests);
        const hatList = [[], [], []];

        let i = 0;
        for (const hatsResponse of responses) {
          if (hatsResponse.ok) {
            const details = await hatsResponse.json();
            hatList[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(hatsResponse);
          }
        }
        setHatColumns(hatList);
      }
    } catch (e) {
      console.error(e);
    }
  }

    useEffect(() => {
        getHats();
    }, [HatPage]);



function HatList(props) {
    const deleteHat = async (event) => {
    const hatID = (event.target.id);
    const url = `http://localhost:8090/api/hats/${hatID}`
    const reply = await fetch(url, {method: 'DELETE'})
        .then((response) => {
            if(!response.ok){
                throw new Error('You messed up');
            }
            getHats()
        })
    }

    return (

        <div className="col">
        {props.list.map(hat => {
            return (
            <div key={hat.id} className="card mb-3 shadow">
                <img
                src={hat.picture_url}
                className="card-img-top"
                alt='Look at this dope ass fucking hat'
                />
                <div className="card-body">
                <h5 className="card-title">{hat.style_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {hat.location.name}
                </h6>
                <p className="card-text">
                    {hat.color}
                </p>
                <NavLink to="#" className="btn btn-primary" onClick={deleteHat} id={hat.id}>Delete Hat</NavLink>
                </div>
            </div>
            );
        })}
        </div>
    );
}


  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
        <h1 className="display-5 fw-bold">CHECK OUT THESE MFIN' HATS</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Yee Haw
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <NavLink to="/" className="btn btn-primary btn-lg px-4 gap-3">Create A Hat</NavLink>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Hats Yo</h2>
        <div className="row">
          {hatColumns.map((hatList, index) => {
            return (
              <HatList key={index} list={hatList} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HatPage;