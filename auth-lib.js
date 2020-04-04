let all_users = [];
let all_groups = [];
let all_rights = [];

// Возвращает массив всех пользователей.
function users()
{
    return all_users;
}

//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser(name, password)
{
    let obj =
    {
        name: name,
        password: password,
        groups: []
    };

    all_users.push(obj);
    return obj;
}

// Удаляет пользователя user
function deleteUser(user)
{
    if (!user)
    {
        throw new Error("Неккоретно введенные данные");
    }

    if (all_users.indexOf(user) === -1)
    {
        throw new Error("Такого пользователя не существует");
    }
    else
    {
        all_users.splice(all_users.indexOf(user), 1);
    }
}

// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user)
{
    if (!user)
    {
        throw new Error("Неккоретно введенные данные");
    }

    if (all_users.indexOf(user) === -1)
    {
        throw new Error("Такого пользователя не существует");
    }
    else
    {
        return all_users[all_users.indexOf(user)].groups;
    }
}

// Добавляет пользователя user в группу group
function addUserToGroup(user, group)
{

    if (!user)
    {
        throw new Error("Некорректно введенные данные");
    }
    else if (!group)
        throw new Error("Некорректно введенные данные");

    if ((all_users.indexOf(user) === -1) || (all_groups.indexOf(group) === -1))
    {
        throw new Error("Такого пользователя/группы не существует");
    }

    else
    {
        user.groups.push(group);
    }
}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group)
{
    if (!user)
    {
        throw new Error("Некорректно введенные данные");
    }
    else if (!group)
        throw new Error("Некорректно введенные данные");

    if ((all_users.indexOf(user) === -1) || (all_groups.indexOf(group) === -1))
    {
        throw new Error("Такого пользователя/группы не существует");
    }

    let indexOfUser = all_users.indexOf(user);
    let indexOfGroup = all_users[indexOfUser].groups.indexOf(group);

    if (indexOfGroup === -1)
    {
        throw new Error("Пользователя нет в этой группе")
    }
    else
    {
        all_users[indexOfUser].groups.splice(indexOfGroup, 1);
    }
}

// Возвращает массив прав
function rights()
{
    return all_rights;
}

// Создает новое право с именем name и возвращает его
function createRight(name)
{
    let new_right = name;
    all_rights.push(new_right);
    return new_right;
}

// Удаляет право right
function deleteRight(right)
{
    if (!right)
    {
        throw new Error("Неккоретно введенные данные");
    }

    if (all_rights.indexOf(right) === -1)
    {
        throw new Error("Нельзя удалить права, которых не существует");
    }
    else 
    {
        all_rights.splice(all_rights.indexOf(right), 1);
        all_groups.forEach(function (obj)
        {
            if (obj.rights.indexOf(right) != -1)
            {
                obj.rights.splice(obj.rights.indexOf(right), 1);
            }
        })
    }
}

// Возвращает массив групп
function groups()
{
    return all_groups;
}

// Создает новую группу и возвращает её.
function createGroup(name)
{

    let new_group =
    {
        name: name,
        rights: []
    };

    all_groups.push(new_group);

    return new_group;
}

// Удаляет группу group
function deleteGroup(group)
{
    if (!group) {
        throw new Error("Неккоретно введенные данные");
    }

    if (all_groups.indexOf(group) === -1)
    {
        throw new Error("Такой группы не существует");
    }
    else
    {
        all_groups.splice(all_groups.indexOf(group), 1);
        all_users.forEach(function (obj)
        {
            if (obj.groups.indexOf(group) != -1)
            {
                obj.groups.splice(obj.groups.indexOf(group), 1);
            }
        })
    }
}

// Возвращает массив прав, которые принадлежат группе group
function groupRights(group)
{
    if (all_groups.indexOf(group) === -1)
    {
        throw new Error("Такой группы не существует");
    }
    else
    {
        return all_groups[all_groups.indexOf(group)].rights;
    }
}

// Добавляет право right к группе group
function addRightToGroup(right, group)
{

    if (!right)
    {
        throw new Error("Некорректно введенные данные");
    }
    else if (!group)
        throw new Error("Некорректно введенные данные");

    if ((all_rights.indexOf(right) === -1) || (all_groups.indexOf(group) === -1))
    {
        throw new Error("Такого пользователя/группы не существует");
    }

    else
    {
        all_groups[all_groups.indexOf(group)].rights.push(right);
    }
    
}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup(right, group)
{
    if (!right) {
        throw new Error("Некорректно введенные данные");
    }
    else if (!group)
        throw new Error("Некорректно введенные данные");

    if ((all_rights.indexOf(right) === -1) || (all_groups.indexOf(group) === -1))
    {
        throw new Error("Таких прав/групп не существует");
    }

    let indexOfGroup = all_groups.indexOf(group);
    let indexOfRights = all_groups[indexOfGroup].rights.indexOf(right);

    if (indexOfRights === -1)
    {
        throw new Error("Такого права нет в группе")
    }
    else
    {
        all_groups[indexOfGroup].rights.splice(indexOfRights, 1);
    }
}

let currentsession =
{
    status: false,
    user: undefined
};

function login(username, password)
{
    let pos = all_users.map(function (obj) { return obj.name; }).indexOf(username);

    if ((pos != -1) && (currentsession.status === false)) {
        if (all_users[pos].password === password)
        {
            currentsession.status = true;
            currentsession.user = all_users[pos];
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

function currentUser()
{
    return currentsession.user;
}

function logout()
{
    currentsession.status = false;
    currentsession.user = undefined;
}

function isAuthorized(user, right)
{
    if (!user) {
        throw new Error("Некорректно введенные данные");
    }
    else if (!right)
        throw new Error("Некорректно введенные данные");

    if ((all_rights.indexOf(right) === -1) || (all_users.indexOf(user) === -1)) {
        throw new Error("Таких пользователя/права не существует");
    }

    let user_groups = user.groups;
    let user_have_right = false;

    user_groups.forEach(function (obj)
    {
        if (all_groups.indexOf(obj) != -1)
        {
            let pos = all_groups.indexOf(obj);
            if (all_groups[pos].rights.indexOf(right) != -1)
            {
                user_have_right = true;
            }
        }
    });

    return user_have_right;
}