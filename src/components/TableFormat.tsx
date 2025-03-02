"use client"
import { UserDto } from "@/dto/userData"; 

export default function TableFormat({data,className}:{data: UserDto[],className?:string}) {

    return (
      <table className={className}>
        <thead>
          <tr>
            {/* <th></th> */}
            <th className="name-col">Name</th>
            <th className="email-col">Email</th>
            <th className="hide-on-mobile">Address</th>
          </tr>
        </thead>
        
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              {/* <td><input type="checkbox" name="userId"/></td> */}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="hide-on-mobile">{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

    )

}