import { MemoryRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthForm from "../components/auth/AuthForm";
import { act, fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import store from "../state/store";
import React from "react";

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch : () => jest.fn(),
    useSelector : () => jest.fn()
}))


describe("Login Component" , ()=> {
    const mockHandleLogin = jest.fn();

    test('render login form', ()=> {
        render(
            <MemoryRouter>
                <AuthForm onLogin={mockHandleLogin} />
            </MemoryRouter>
        )
    
        let txt = screen.getByRole('heading', { name: /login/i });;
        expect(txt).toBeInTheDocument();
    })

    test('email and password input fields', ()=>{
        render(
            <MemoryRouter>
                <AuthForm onLogin={mockHandleLogin}/>
            </MemoryRouter>
        );

        let emailTxt = screen.getByPlaceholderText('Email');
        expect(emailTxt).toBeInTheDocument();

        let passwordTxt = screen.getByPlaceholderText('Password');
        expect(passwordTxt).toBeInTheDocument();

    })

    test("login button", ()=> {
        render(
            <MemoryRouter>
                <AuthForm onLogin={mockHandleLogin}/>
            </MemoryRouter>
        )

        let btn = screen.getByRole('button', {
            name: /login/i
          });
          expect(btn).toBeInTheDocument();
    })

    test('on change of text boxes', async()=> {
        const handleChange = jest.fn();
        render(
            <MemoryRouter>
                <AuthForm onLogin={mockHandleLogin}/>
            </MemoryRouter>
        )
        userEvent.setup();
        const email = screen.getByPlaceholderText('Email');
        await act(async()=>{
            await userEvent.type(email, 'roshani@123.com');
        })
        expect(email).toHaveValue('roshani@123.com');

        const password = screen.getByPlaceholderText('Password');
        await act(async()=>{ 
            await userEvent.type(password,'rosh123');
        })
        expect(password).toHaveValue('rosh123');
    })

    test('on submit of login form', async()=> {
        userEvent.setup();
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <AuthForm onLogin={mockHandleLogin}/>
                </Provider>
            </MemoryRouter>
        )

        const form = {
            email : 'roshani@123.com',
            password : 'rosh123'
        }

        const loginBtn = screen.getByRole('button', { name : /login/i });
        await act( async()=>{
            await userEvent.click(loginBtn)
        })
        await waitFor(() => expect(store.getState().user.loading).toBeFalsy());
        
        // // Assert that the form has been reset after submission
        expect(screen.getByPlaceholderText('Email')).toHaveValue('');
        expect(screen.getByPlaceholderText('Password')).toHaveValue('');
        
    })
    
})

