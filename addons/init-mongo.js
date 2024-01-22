db = db.getSiblingDB('users');
db.createUser({
    user: 'auth-user',
    pwd: 'password-db',
    roles: [
        {
            role: 'readWrite',
            db: 'users'
        }
    ]
});

db = db.getSiblingDB('tasks');
db.createUser({
    user: 'auth-user',
    pwd: 'password-db',
    roles: [
        {
            role: 'readWrite',
            db: 'tasks'
        }
    ]
});
