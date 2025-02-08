import {User} from '../models/user.model';

export const MOCK_USERS: User[] = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        email: ''
    },  
    {
        id: 2,
        username: 'editor',
        password: 'editorpass',
        role: 'editor',
        email: ''
    },
    {
        id: 3,
        username: 'viewer',
        password: 'viewerpass',
        role: 'viewer',
        email: ''
    }
];