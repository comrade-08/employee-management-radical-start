import { CalendarDaysIcon, ChevronLeft } from 'lucide-react'
import React from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import { Button, Container } from 'react-bootstrap'
import Calendar from 'react-calendar';

export default function CalendarPage() {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1">
        <NavBar />
        <Container className="p-4">
          <div className="mb-4 fw-bold fs-2 d-flex align-items-center gap-2">
            <Button className="p-0" onClick={() => navigate(-1)} variant="link text-dark"><ChevronLeft size={45} /></Button> Calendar View
          </div>
          <div className="border-bottom border-2 mb-4">
            <div style={{width: 'fit-content'}} className="d-flex align-items-center gap-2 pb-3 border-bottom border-primary border-2 text-primary fw-bold">
            <CalendarDaysIcon size={20}/>
            Calendar
          </div>
          </div>
          <div>
            <Calendar calendarType='gregory' className='bg-light border-0 w-100 p-4 fw-bold text-muted'/>
          </div>
        </Container>
      </div>
    </div>
  )
}
