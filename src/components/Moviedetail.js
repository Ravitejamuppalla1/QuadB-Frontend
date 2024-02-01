import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
    Modal,
    Button,

} from '@mui/material';
import Swal from 'sweetalert2';



const Moviedetail = (props) => {
    const { id } = props.match.params;
    const [showData, setShowData] = useState(null);
    const [moviename, setMovieName] = useState('')
    const [name, setName] = useState(localStorage.getItem('name') ? localStorage.getItem('name') : '')
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') ? localStorage.getItem('phoneNumber') : '')
    const [tickets, setTickets] = useState(0)
    const [isBookingModalOpen, setBookingModalOpen] = useState(false);
    const[formErrors,setFormErrors] =useState({})
    const errors = {}

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
        },
    };


    useEffect(() => {
        const fetchShowData = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setShowData(response.data);
            } catch (error) {
                console.error("Error fetching show data:", error);
            }
        };

        fetchShowData();
    }, [id]);

    useEffect(() => {
        setMovieName(showData?.name)
    }, [showData])


    const handleBookClick = () => {
        setBookingModalOpen(true);
    };

    const handleBookingClose = () => {
        setBookingModalOpen(false);
    };

    const handleTiketsChange = (e) => {
        setTickets(e.target.value)
    }


    const handleMovieNameChange = (e) => {
        setMovieName(e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const runValidations = () => {
        if (moviename.length === 0) {
            errors.moviename = 'Movie name cannot be blank'
        }
        if (name.length === 0) {
            errors.name = 'Name cannot be blank'
        }
        if (phoneNumber.length === 0) {
            errors.phoneNumber = 'phone Number cannot be blank'
        }
        if (tickets == 0) {
            errors.tickets = 'Number of Tickets cannot be zero'
        }

    }

    const handleCancel = ()=>{
        setName(localStorage.getItem('name'))
        setPhoneNumber(localStorage.getItem('phoneNumber'))
        setTickets(0)
        handleBookingClose()
    }

    const handleBookingConfirm = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setFormErrors({})
        let details = {
            moviename,
            name,
            phoneNumber,
            tickets
        }
        handleBookingClose()
        localStorage.setItem('bookingDetails', JSON.stringify(details));

        Swal.fire({
            icon: 'success',
            title: 'Booking Successful!',
            text: 'Your tickets have been booked successfully.',
        });

        props.history.push('/home');
    }
    else {
        setFormErrors(errors)
    }
    };



    return (
        <div style={{ backgroundImage: `url(${showData && showData.image ? showData.image.original : ''})`, backgroundSize: 'cover', backgroundPosition: 'top center', height: '140vh', margin: 0 }}>
            <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
                <Link to="/home" style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', textDecoration: 'none', padding: '10px', backgroundColor: 'rgba(255, 92, 92, 0.8)', borderRadius: '5px', fontWeight: 'bold' }}>
                    <span >Back to Home</span>
                </Link>
                {showData ? (
                    <div style={{ padding: '190px' }}>

                        <h1 style={{ fontWeight: 'bold', marginTop: '190px' }}>{showData.name}</h1>
                        <p style={{ textAlign: 'left', margin: '0 auto', maxWidth: '800px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', color: 'black' }}>
                            {showData.summary && showData.summary.replace(/<p>|<\/p>|<b>|<\/b>/g, '')}
                        </p>

                        <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#FF5C5C' }} onClick={handleBookClick}>
                            <div style={{ color: 'white', cursor: 'pointer' }} >Book Tickets</div>
                        </Button>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}

                {/* Booking Form Modal */}
                {showData &&
                    <Modal
                        open={isBookingModalOpen}
                        onClose={handleBookingClose}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        
                        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '10px', maxWidth: '300px', width: '80%' }}>

                            <img src={showData.image.original} alt={showData.name} style={{ width: '40%', height: '20%', marginBottom: '40px', borderRadius: '10px' }} />
                            <form >
                                <label>
                                    Movie   </label>
                                <input type="text" name="name" value={showData.name} style={{ marginBottom: '10px', marginLeft: '75px' }} />
                                {formErrors.moviename && <span style={{ color: "red" }}>{formErrors.moviename}</span> }

                                <br />
                                <label>
                                    Name   </label>
                                <input type="text" name="name" value={name} onChange={handleNameChange} style={{ marginBottom: '10px', marginLeft: '75px' }} />
                                {formErrors.name && <span style={{ color: "red" }}>{formErrors.name}</span> }

                                <br />
                                <label>
                                    PhoneNumber </label>
                                <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} style={{ marginBottom: '10px', marginLeft: '25px' }} />
                                {formErrors.phoneNumber && <span style={{ color: "red" }}>{formErrors.phoneNumber}</span> }

                                <br />
                                <label>
                                    Number of Tickets </label>
                                <input type="number" name="numTickets" value={tickets} onChange={handleTiketsChange} style={{  marginBottom: '20px' }}  />
                                {formErrors.tickets && <span style={{ color: "red" }}>{formErrors.tickets}</span> }

                                <br />

                                <Button variant="contained" style={{ backgroundColor: '#FF5C5C',marginRight: '10px' }} onClick={handleCancel}>
                                    Cancel
                                </Button>

                                <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={handleBookingConfirm}>
                                    Confirm
                                </Button>
                            </form>
                        </div>
                    </Modal>
                }

            </div>
        </div>
    );
}

export default (Moviedetail);
