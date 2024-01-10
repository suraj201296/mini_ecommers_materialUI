import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import { Provider } from "react-redux";
import store from "../state/store";

const mockUser = {
    id: 1,
    name: 'suraj kamble',
    email: 'suraj@123.com',
    status: true,
    role: 'user',
  }; 
 

describe('User Details component',()=>{
    test('render user card',()=>{
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserDetails user={mockUser}/>
                </MemoryRouter>
            </Provider>
        )
        let name = screen.getByText('suraj kamble');
        expect(name).toBeInTheDocument();
    })      
})