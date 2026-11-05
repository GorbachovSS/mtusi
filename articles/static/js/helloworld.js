var groupmates = [
    { name: "Александр", surname: "Иванов", group: "ББТ1702", marks: [4, 3, 5] },
    { name: "Иван", surname: "Петров", group: "БСТ1702", marks: [4, 4, 4] },
    { name: "Кирилл", surname: "Смирнов", group: "БАП1801", marks: [5, 5, 5] },
    { name: "Анна", surname: "Кузнецова", group: "ББТ1702", marks: [3, 4, 4] }
];

// Функция для выравнивания строк (аналог ljust из Python)
var rpad = function (str, length) {
    str = str.toString();
    while (str.length < length) str += ' ';
    return str;
};

// Функция вывода всех студентов
var printStudents = function (students) {
    console.log(rpad("Имя", 15), rpad("Фамилия", 15), rpad("Группа", 10), rpad("Оценки", 20));
    for (var i = 0; i < students.length; i++) {
        console.log(rpad(students[i]['name'], 15), rpad(students[i]['surname'], 15),
                    rpad(students[i]['group'], 10), rpad(students[i]['marks'], 20));
    }
    console.log('\n');
};

// Выводим всех студентов в консоль
printStudents(groupmates);

// Задание 1: Фильтр по группе
var groupInput = prompt("Введите группу для фильтрации (например, ББТ1702):");
if (groupInput) {
    var filteredByGroup = groupmates.filter(function(s) { return s.group === groupInput; });
    console.log("Студенты группы " + groupInput + ":");
    printStudents(filteredByGroup);
}

// Задание 2: Фильтр по среднему баллу
var avgInput = parseFloat(prompt("Введите минимальный средний балл (например, 4.0):"));
if (!isNaN(avgInput)) {
    var filteredByAvg = groupmates.filter(function(s) {
        var sum = s.marks.reduce(function(a, b) { return a + b; }, 0);
        return (sum / s.marks.length) > avgInput;
    });
    console.log("Студенты со средним баллом выше " + avgInput + ":");
    printStudents(filteredByAvg);
}