"use client"

import TableFormat from "@/components/TableFormat"
import {dataService} from "@/services/dataService"
import {UserDto} from '@/dto/userData'
import { ThemeToggle } from "@/components/elements/ThemeToggle";

import { useRef, useState, useEffect } from "react";
import { ModalHandle } from "../components/elements/Modal";
import UserForm from "@/components/userForm";
import TableNotDestop from "@/components/TableNonDesktop";
import Modal from "../components/elements/Modal";

export default function Home() {
  const [data, setData] = useState<UserDto[]>([]);
  const modal = useRef<ModalHandle>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await dataService.getData();
      setData(response);
    };
    fetchData();
  }, []);

  function handleCloseAddGoals() {
      modal.current?.close();
  }

  function handleOpenAddGoals() {
      modal.current?.open();
  }

  //TableFormat, currently i did not set up pagination yet.

  return (
    <div className="container ">

      <div className="header-container">
        <p>Users Profile Test2</p>
      
        <div className="actionbar set-left">
          <ThemeToggle />
          <Modal ref={modal}>
            <UserForm setData={setData} handleCloseAddGoals={handleCloseAddGoals}/>
          </Modal>
          <button
            className="button-styling button-border bg-white" 
            onClick={handleOpenAddGoals}>
              Add New
          </button>
        </div>
      </div>        

      {/* handle Desktop or Mobile And Tablet */}
      <TableFormat data={data} className="desktop-only"/>
      <TableNotDestop data={data} className="mobile-and-tablet-only top-border"/>
      
    </div>
    
  );
}
