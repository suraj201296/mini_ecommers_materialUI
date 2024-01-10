import { MemoryRouter } from "react-router-dom"
import UserForm from "../components/user/UserForm"
import { logRoles, prettyDOM, render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { Provider } from "react-redux"
import store from "../state/store"
import { act } from "react-dom/test-utils"
import userEvent from "@testing-library/user-event"


describe('UserForm component', ()=>{

    const mockUser = {
        id: 1,
        name: 'suraj kamble',
        email: 'suraj@123.com',
        status: true,
        role: 'user',
    }

    test('open edit user modal', async()=>{
        userEvent.setup()
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserForm selectedUser={mockUser}/>
                </MemoryRouter>
            </Provider>
        );

        let editButton = screen.getByRole('button', {
            name : /edit/i
        })

        expect(editButton).toBeInTheDocument();

        await act(async() => {
            await userEvent.click(editButton);
        })
        expect(screen.getByText('Edit User')).toBeInTheDocument();
    })

    test('on close modal', async() => {
        userEvent.setup();
        render(
            <Provider store={store} >
                <MemoryRouter>
                    <UserForm selectedUser={mockUser}/>
                </MemoryRouter>
            </Provider>
        )

        let editButton = screen.getByRole('button', {
            name : /edit/i
        })

        expect(editButton).toBeInTheDocument();

        await act(async()=> {
            await userEvent.click(editButton);
        })

        let cancelBtn = screen.getByText('Cancel');
        expect(cancelBtn).toBeInTheDocument();

        await act(async()=> {
            await userEvent.click(cancelBtn);
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Edit User'));
    
        const closedModal = screen.queryByText('Edit User');
        expect(closedModal).toBeNull();
    })

    test('on change input', async()=>{

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserForm selectedUser={mockUser}/>
                </MemoryRouter>
            </Provider>
        )

        let editButton = screen.getByRole('button', {
            name : /edit/i
        })

        expect(editButton).toBeInTheDocument();

        await act(async()=> {
            await userEvent.click(editButton);
        })

        let nameInput = screen.getByRole('textbox', {  name: /name/i});
        await act(async()=>{
            await userEvent.clear(nameInput);
            await userEvent.type(nameInput,'Suraj Kamble')
        })

        expect(nameInput).toHaveValue('Suraj Kamble');
    })

    test('on change select drowpdown', async()=>{
        userEvent.setup();

        const {debug} = render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserForm selectedUser={mockUser} />
                </MemoryRouter>
            </Provider>
        )

        let editButton = screen.getByRole('button', {
            name : /edit/i
        })

        expect(editButton).toBeInTheDocument();

        await act(async()=> {
            await userEvent.click(editButton);
        })

        let roleDropdown = screen.getByRole('combobox', {
            name: /role/i
        });

        expect(roleDropdown).toBeInTheDocument()
        // await act(async()=>{
        //     await userEvent.selectOptions(roleDropdown, 'admin'); 
        // })

        const roleSelect = screen.getByLabelText('Role');
        


    })

    test('update user function', async()=>{
        userEvent.setup();
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserForm selectedUser={mockUser} />
                </MemoryRouter>
            </Provider>
        )
    })
})  