import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useClubAuth } from "../../context/ClubContext";
import { fetchDate, fetchTime } from "../../functions/functions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DetailedCard } from "../../components/card/DetailedCard";
import { EditCard } from "../../components/card/EditCard";
import { useEventAuth } from "../../context/EventContext";
import Swal from "sweetalert2";

export const ClubDashboard = () => {
  const { club, clubEvents, fetchClubEvents, loading, eventLoading } =
    useClubAuth();
  const { deleteEvent } = useEventAuth();
  const [showCard, setShowCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  useEffect(()=>{
    const fetchE = async () => {
      try {
        await fetchClubEvents(club.username)
      } catch (err) {
        console.log("Error fetching Data",err)
      }
    }
    fetchE()
  },[])

  const handleShowDetailedCard = (e) => {
    setSelectedEvent(e);
    setShowCard(true);
  };
  const handleCloseDetailedCard = () => {
    setShowCard(false);
  };

  const handleShowEditCard = (e) => {
    setSelectedEvent(e);
    setShowEditCard(true);
  };
  const handleCloseEditCard = () => {
    setShowEditCard(false);
  };

  const handleDeleteEvent = async (e) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete the event "${e}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await deleteEvent(e, club.username);
        await fetchClubEvents(club.username);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Event Deleted",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error deleting event",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  if (loading || eventLoading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="h-fit w-full flex flex-col gap-1 dark:text-white">
        {clubEvents.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 10 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clubEvents.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="transition-transform hover:scale-101"
                  >
                    <TableCell align="right" component="th" scope="row">
                      <div className="flex justify-center">
                        <img
                          src={row.imgPath}
                          alt="No Image"
                          className="w-15"
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      align="right"
                      component="th"
                      scope="row"
                      onClick={() => handleShowDetailedCard(row)}
                      className="hover:cursor-pointe"
                      sx={{ "&:hover": { color: "blue" } }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      {fetchDate(row.eventDate)}
                    </TableCell>
                    <TableCell align="right">
                      {fetchTime(row.eventDate)}
                    </TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 px-3 items-center">
                        <button
                          className="border p-1 rounded-lg bg-blue-300 hover:bg-blue-500"
                          onClick={() => handleShowEditCard(row)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="border p-1 rounded-lg bg-red-400 hover:bg-red-500"
                          onClick={() => handleDeleteEvent(row.name)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p className="text-center pt-5">No events</p>
        )}
      </div>
      {showCard && (
        <div
          className="fixed inset-0 flex w-screen h-screen justify-center items-center z-50 backdrop-blur-lg bg-black/10"
          onClick={handleCloseDetailedCard}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DetailedCard
              event={selectedEvent}
              onClose={handleCloseDetailedCard}
            />
          </div>
        </div>
      )}
      {showEditCard && (
        <div
          className="fixed inset-0 flex w-screen h-screen justify-center items-center z-50 backdrop-blur-lg bg-black/10"
          onClick={handleCloseEditCard}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EditCard event={selectedEvent} onClose={handleCloseEditCard} />
          </div>
        </div>
      )}
    </>
  );
};
