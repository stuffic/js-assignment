let all_users = [];

// Возвращает массив всех пользователей.
function users()
{
    return all_users;
}

//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser(name, password)
{
    let obj = new Object();
    obj.name = name;
    obj.password = password;
    obj.groups = ["all"];
    all_users.push(obj);
    return obj.name;
}

// Удаляет пользователя user
function deleteUser(user)
{
    let searchuser = user;
    let indexOfUser = -1;
    for (let i = 0; i < all_users.length; i++)
    {
        if (all_users[i].name == searchuser) {
            indexOfUser = i;
            break;
        }
    }

    if (!user)
    {
        throw new Error("Неккоретно введенные данные");
    }

    if (indexOfUser === -1)
    {
        throw new Error("Нельзя удалить несуществующего пользователя");
    }

    all_users.splice(indexOfUser, 1);

}

// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user)
{

}

// Добавляет пользователя user в группу group
function addUserToGroup(user, group)
{
}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) {}

// Возвращает массив прав
function rights() {}

// Создает новое право с именем name и возвращает его
function createRight(name) {}

// Удаляет право right
function deleteRight(right) {}

// Возвращает массив групп
function groups() {}

// Создает новую группу и возвращает её.
function createGroup(name) {}

// Удаляет группу group
function deleteGroup(group) {}

// Возвращает массив прав, которые принадлежат группе group
function groupRights() {}

// Добавляет право right к группе group
function addRightToGroup() {}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup() {}

function login(username, password) {}

function currentUser() {}

function logout() {}

function isAuthorized(user, right) {}
