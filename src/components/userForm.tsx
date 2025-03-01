
import {FormInput} from "@/components/elements/FormInputs"
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
            alert(response.error);
            return;
          }
                    
          // Use functional update pattern instead of direct state access
          setData((prevData) => [...prevData, response.data]);
          
          (e.target as HTMLFormElement).reset();
          handleCloseAddGoals();
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      // Remove data from the dependency array since we're using functional updates
    }

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