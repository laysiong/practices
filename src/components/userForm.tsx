
import {FormInput} from "@/components/elements/FormInputs"
import ErrorMsg from "./elements/ErrorMsg";

import {dataService} from "@/services/dataService"
import {UserDto} from '@/dto/userData'
import { useRef, Dispatch, SetStateAction, useState} from "react";
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'


export interface UserFormProps {
    setData: Dispatch<SetStateAction<UserDto[]>>;
    handleCloseAddGoals: ()=> void;
}

export default function UserForm({setData, handleCloseAddGoals}: UserFormProps) {
    const inputref = useRef<google.maps.places.SearchBox | null>(null);

    //Google Place API loader
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: ['places']
      })

    const [enteredValues, setEnteredValues] = useState({
        name: '',
        email: '',
        address: ''
      });
    
    const [didEdit, setDidEdit] = useState({
        email: false,
        address: false,
    });

    // Error state after subbmitting the form
    const [error, setError] = useState<string | null>(null);

    const emailIsInvalid = didEdit.email 
                           && !enteredValues.email.includes('@');

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(emailIsInvalid) {
            return;
        }

        try {
          const response = await dataService.createData(enteredValues);
          if (response.error) {
            setError(response.error);
            return;
          }
        
          // Update the state with the new data
          setData(prevData => [...prevData, response.data]);

          // Add the new user to the local storage
          // I was facinmg some issue with the local storage, i had to addUser here instead.
          // If i  will add it in the dataService, it will have duplicate data for first attempt.
          // Rest of the Attempt it will work fine.
          dataService.addUser(response.data);

          (e.target as HTMLFormElement).reset();
          handleCloseAddGoals();
        } catch (error) {
          console.error("Error submitting form:", error);
        }
    }

    // A general function to handle input change
    function handleInputChange(identifier: keyof typeof enteredValues, value: string) {
        setEnteredValues((prevValues) => ({
          ...prevValues,
          [identifier]: value,
        }));
        setDidEdit((prevEdit) => ({
          ...prevEdit,
          [identifier]: false,
        }));
      }
    
    // A general function to handle input blur
    function handleInputBlur(identifier: keyof typeof enteredValues) {
        setDidEdit((prevEdit) => ({
            ...prevEdit,
            [identifier]: true,
        }));
    }

    const handleOnPlacesChanged = () => {
        const places = inputref.current?.getPlaces();
        if (places && places.length > 0) {
            // Update your form state with the selected address
            setEnteredValues(prev => ({
                ...prev,
                address: places[0].formatted_address || ''
            }));
        }
    }
    return (
        <form className="userform" onSubmit={(e) => handleSubmit(e)}>
            {error && <ErrorMsg errorMsg={error} className="error-msg-title "/>}
            
            <FormInput name="name" value={enteredValues.name} placeholder="Enter Name"
                    handleInputChange={(e) => handleInputChange('name', e.target.value)}
                    required={true}/>

            <FormInput name="email" value={enteredValues.email} placeholder="Enter Email"
                    handleInputBlur={() => handleInputBlur('email')}
                    handleInputChange={(e) => handleInputChange('email', e.target.value)}
                    required={true}
                    errorMsg={emailIsInvalid ? "Invalid Error" : undefined}/> 

            {isLoaded ? (
                <StandaloneSearchBox 
                    onLoad={(ref) => inputref.current = ref}
                    onPlacesChanged={handleOnPlacesChanged}
                >
                    <FormInput name="address" value={enteredValues.address} placeholder="Enter Address"
                        handleInputChange={(e) => handleInputChange('address', e.target.value)}
                        required={true}/>
        
                </StandaloneSearchBox>
            ) : (
                <input 
                    type="text"
                    placeholder="Loading Google Places..."
                    disabled
                    className="form-control"
                />
            )}
    
            <div className="actionbar set-left">
                <button className="button-styling button-border" type="submit" value="Submit">Submit </button>
                <button  className="button-styling button-border" type="button" onClick={handleCloseAddGoals}>Close</button>
            </div>
        </form>
    )
}