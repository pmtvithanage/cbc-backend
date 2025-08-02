import Student from '../models/student.js';

export async function getStudents(req, res) {
    // read and get all the students information in the database
    /*
        Student.find()
        .then((students) => {
            console.log('Students retrieved successfully');
            console.log(students);
            res.json({
                message: 'Students retrieved successfully',
                students: students
            });
        })
        .catch((error) => {
            console.error('Error retrieving students:', error);
            res.status(500).json({
                message: 'Error retrieving students',
                error: error.message
            });
        });
    */
    try {
        const students = await Student.find(); //Using async/await for better readability
        console.log('Students retrieved successfully');
        res.json({
            message: 'Students retrieved successfully',
            students: students
        });
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).json({
            message: 'Error retrieving students',
            error: error.message
        });
    }
}

export function createStudent(req, res) {
    console.log(req.body);

    console.log('Request received at /students endpoint');

    const student = new Student(req.body);

    student.save()
        .then(() =>
            {
                console.log('Student added successfully');
                res.json({
                    message: 'Student added successfully',
                    student: student
                });
            }
        ).catch(() => 
            {
                res.json({
                    message: 'Error adding student',
                });
                
            }
        );
}

export function updateStudent(req, res) {
    const { id } = req.body;
}

export function deleteStudent(req, res) {
    const { id } = req.body;
}

