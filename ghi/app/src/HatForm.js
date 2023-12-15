import React, { useEffect, useState } from 'react';


function HatForm(){

    const [fabric, setFabric] = useState('');
    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }

    const [style_name, setStyleName] = useState('');
    const handleStyleChange = (event) => {
        const value = event.target.value;
        setStyleName(value);
    }

    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const [picture_url, setPictureUrl] = useState('');
    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const [location, setLocation] = useState('');
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const [locations, setLocations] = useState([]);


    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setLocations(data.locations);

        }
      }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.fabric = fabric;
        data.style_name= style_name;
        data.color = color;
        data.picture_url = picture_url;
        data.location = location;


        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const hatUrl = 'http://localhost:8090/api/hats/';
        const response = await fetch(hatUrl, fetchConfig);

        if (response.ok) {
            setFabric('');
            setStyleName('');
            setColor('');
            setPictureUrl('');
            setLocation('');
          }

      }

      useEffect(() => {
        fetchData();
      }, []);

return (
    <div className="container">
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Hat</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFabricChange} placeholder="Fabric" required type="text" id="fabric" name="fabric" className="form-control" value={fabric} />
              <label htmlFor="fabric">Fabric</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleStyleChange} placeholder="Style Name" required type="text" id="style_name" name="style_name" className="form-control" value={style_name} />
              <label htmlFor="style_name">Style</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleColorChange} placeholder="Color" required type="text" id="color" name="color" className="form-control" value={color} />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handlePictureChange} placeholder="Picture URL" required type="text" id="picture_url" name="picture_url" className="form-control" value={picture_url} />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select value={location} onChange={handleLocationChange} required id="location" name="location" className="form-select" >
                <option value="">Choose a location</option>
                    {locations.map(location => {
                        return (
                          <option key={location.href} value={location.href}>
                          {location.closet_name},
                          </option>
                        );
                        })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
)
}

export default HatForm;