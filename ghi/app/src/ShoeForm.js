import React, { useState, useEffect } from "react";


function ShoeForm() {

    const [ name, setName ] = useState('');

    const [ manufacturer, setManufacturer ] = useState('');

    const [ color, setColor ] = useState('');

    const [ pictureUrl, setPictureUrl ] = useState('');

    const [ bins, setBins ] = useState([]);

    const [ bin, setBin ] = useState('');

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const handleManufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturer(value);
    }

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value);
    }

    const handlePictureUrlChange = (e) => {
        const value = e.target.value;
        setPictureUrl(value);
    }

    const handleBinChange = (e) => {
        const value = e.target.value;
        setBin(value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const shoeUrl = 'http://localhost:8080/api/shoes/';

        const data = {};
        data.name = name;
        data.manufacturer = manufacturer;
        data.color = color;
        data.picture_url = pictureUrl;
        data.bin = bin;

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(shoeUrl, fetchOptions);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);
            setName('');
            setManufacturer('');
            setColor('');
            setPictureUrl('');
            setBin('');
        }
    }


    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';
        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setBins(data.bins);
                console.log(data.bins);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new shoe</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} placeholder="name" value={name} required type="text" name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input onChange={handleManufacturerChange} placeholder="manufacturer" value={manufacturer} required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                    <label htmlFor="manufacturer">Manufacturer</label>
                </div>

                <div className="form-floating mb-3">
                    <input onChange={handleColorChange} placeholder="color" value={color} required type="text" name="color" id="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                </div>

                <div className="form-floating mb-3">
                    <input onChange={handlePictureUrlChange} placeholder="Picture URL" value={pictureUrl} required name="picture_url" id="picture_url" className="form-control"></input>
                    <label htmlFor="picture_url">Picture URL</label>
                </div>

                <div className="mb-3">
                    <select onChange={handleBinChange} required value={bin} name="bin" id="bin" className="form-select">
                        <option value="">Choose a bin</option>

                        {bins.map(bin => {
                            return (
                                <option value={bin.href} key={bin.id}>{bin.closet_name}</option>
                            );
                        })}

                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
      </div>
    );
}

export default ShoeForm;
