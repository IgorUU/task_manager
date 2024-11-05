<?php

class MyDB extends SQLite3
{

    public function __construct()
    {
        $this->open(getenv('DB_DIRECTORY') . getenv('DB_NAME'), SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
        $this->query('CREATE TABLE IF NOT EXISTS "tasks" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            "task" VARCHAR,
            "task_description" VARCHAR,
            "time" DATETIME
        )');
    }

    public function insert()
    {
        $task = $_POST['task'] ?? '';
        $task_description = $_POST['taskDescription'] ?? '';

        if (empty($task)) {
            http_response_code(400);
            echo json_encode(['error' => 'Please enter a task name']);
            return;
        }

        $statement = $this->prepare('INSERT INTO tasks (task, task_description, time) VALUES (:task, :task_description, :time)');
        $statement->bindValue(':task', $task);
        $statement->bindValue(':task_description', $task_description);
        $statement->bindValue(':time', time());
        $statement->execute();

        echo json_encode([
            'message' => "Task '$task' created.",
        ]);
    }

    public function dropTable()
    {
        $this->query('DELETE FROM tasks');

        echo json_encode([
            'message' => "All tasks deleted successfully!",
        ]);
    }

    public function getTasks() {
        $results = [];
        $query = $this->query('SELECT * FROM tasks');
        while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
            $results[]= $row;
        }

        echo json_encode($results);
    }
}
