import React from "react"
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { AppBar, Toolbar, Grid, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import axios from '../config/axios'
import Moviedetail from '../components/Moviedetail'


const Home = (props) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://api.tvmaze.com/search/shows?q=all");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            Swal.fire('Error fetching data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlelogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('phoneNumber')
        localStorage.removeItem('name')
        localStorage.removeItem('bookingDetails');
        Swal.fire('Successfully logged out');
        props.history.push('/login');
    };

    return (
        <div>
            <AppBar position="static">

                <Toolbar>
                    <Grid container spacing={10} alignItems="center">
                        <Grid item>
                            <Typography variant="h6" style={{ cursor: 'pointer' }}>
                                Home
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="h6"
                                onClick={handlelogout}
                                style={{ cursor: 'pointer' }}
                            >
                                Logout
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: '20px' }}>
                {data.map((item) => (
                    <div key={item.show.id} style={{ width: '200px', margin: '10px', textAlign: 'center' }}>
                        <Link to={`/moviedetail/${item.show.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                            <img
                                src={item.show.image ? item.show.image.medium : ""}
                                alt={item.show.name}
                                style={{ width: '100%', height: '280px', objectFit: 'cover', cursor: 'pointer' }}
                            />
                            <Typography variant="subtitle1" style={{ marginTop: '10px', cursor: 'pointer', color: 'inherit' }}>
                                {item.show.name}
                            </Typography>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Home