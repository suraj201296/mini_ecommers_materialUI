import { render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Users from "../pages/Users"
import { Provider } from "react-redux";

const mockStore = (state : any) => ({
    getState: () => state,
    dispatch: jest.fn(),
    subscribe: jest.fn(),
});

describe('Users Component',()=>{
    let store : any;

    test('render users component',async()=>{
        store = mockStore({
            user: {
                response: [
                    { id: 1, name: 'User 1' },
                    { id: 2, name: 'User 2' },
                ],
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Users />
                </MemoryRouter>
            </Provider>
          );
      
          const text1 = screen.getByText(/User 1/i);
          await waitFor(() => {
            expect(text1).toBeInTheDocument();
          });

    })

    test('if not any users present', async()=>{
        store = mockStore({
            user : {
                response : []
            }
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Users/>
                </MemoryRouter>
            </Provider>
        );

        let text1 = screen.queryByText(/User 1/i);
        await waitFor(()=>{
            expect(text1).not.toBeInTheDocument();
        })
    })
})