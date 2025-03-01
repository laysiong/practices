"use client"

import TableFormat from "@/components/TableFormat"
import {dataService} from "@/services/dataService"
import {UserDto} from '@/dto/userData'
import { ThemeToggle } from "@/components/elements/ThemeToggle";

import dynamic from "next/dynamic";

import { useRef, useState, useEffect } from "react";
import { ModalHandle } from "../components/elements/Modal";
import UserForm from "@/components/userForm";

const Modal = dynamic(() => import("../components/elements/Modal"), { ssr: false });

export default function Home() {
  const [data, setData] = useState<UserDto[]>([]);

  const modal = useRef<ModalHandle>(null);
  console.log("UserForm", data);

  
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

 
  return (
    <div className="container ">
      <div className="header-container">
        <p>Users Profile</p>
      
        <div className="actionbar set-left">
          <ThemeToggle />
          <Modal ref={modal}>
            <UserForm setData={setData} handleCloseAddGoals={handleCloseAddGoals}/>
          </Modal>
          <button
            className="button-styling button-border bg-white" 
            onClick={handleOpenAddGoals}>Add New</button>
          </div>
      </div>        

        <TableFormat data={data}/>

    </div>
    
  );
}
