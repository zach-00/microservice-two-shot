import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

function ShoeList() {
    const [ columns, setColumns ] = useState([[], [], []]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/shoes/';
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                const requests = [];
                for (let shoe of data.shoes) {
                    const shoeUrl = `http://localhost:8080/api/shoes/${shoe.id}`;
                    requests.push(fetch(shoeUrl));
                }

                const responses = await Promise.all(requests);
                const shoeColumns = [[], [], []];

                let i = 0;
                for (let shoeResponse of responses) {
                    if (shoeResponse.ok) {
                        const shoeData = await shoeResponse.json();
                        shoeColumns[i].push(shoeData);
                        i++;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(shoeResponse);
                    }
                }
                setColumns(shoeColumns);
            }
    } catch (error) {
        console.error(error);
    }

}

    useEffect(() => {
        fetchData();
    }, []);


    function ShoeColumns(props) {




        const handleDelete = async (event) => {
           const shoeID = event.target.id;
           const shoeUrl = `http://localhost:8080/api/shoes/${shoeID}`;

           const fetchOptions = {
               method: "DELETE",
               headers: {
                   'Content-Type': 'applications/json',
               }
           }

           const response = await fetch(shoeUrl, fetchOptions);
           if (response.ok) {
               console.log("Shoe deleted");
                fetchData();
           }
        }

       return (
           <div className="col">
               {props.list.map(shoeDetail => {
                   return (
               <div className="card mb-3 shadow" key={shoeDetail.id}>
                   <img src={shoeDetail.picture_url} className="card-img-top"/>
                   <div className="card-body">
                       <h5 className="card-title">{shoeDetail.manufacturer}, {shoeDetail.name}</h5>
                       <p className="card-text">{shoeDetail.color}</p>
                       <NavLink onClick={handleDelete} to="#" id={shoeDetail.id} className="btn btn-primary">Delete Shoe</NavLink>
                   </div>
               </div>
                   );
               })}
           </div>

       );
   }

    return (
        <div className="container">
            <h2>Shoes List</h2>
            <div className="row">

            {columns.map((shoeList, index) => {
                return (
                <ShoeColumns key={index} list={shoeList} />
                );
            })}
            </div>
        </div>
    );

}


export default ShoeList;
