"use client"
import { UserDto } from "@/dto/userData"; 
import CollapsibleDetail from "./elements/CollapsibleDetailProps";

export default function TableNotDestop({data,className}:{data: UserDto[],className?:string}) {

    return (
      <div className={className}>
          {data.map((user) => (
            <div key={user.id}>
                <CollapsibleDetail
                    key={user.id}
                    title={user.name}
                    details={[
                    { label: 'Email', value: user.email },
                    { label: 'Address', value: user.address },
                    // Add more fields as needed
                    ]}
                />
            </div>
          ))}
      
      </div>
    )

}