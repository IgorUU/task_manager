<?php

class MyDB extends SQLite3 {

    public function __construct() {
        $this->open(getenv('DB_DIRECTORY') . getenv('DB_NAME'), SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
        $this->query('CREATE TABLE IF NOT EXISTS "tasks" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            "subject" VARCHAR,
            "task" VARCHAR,
            "time" DATETIME
        )');
    }

    public function insert(string $task = '') {
        if (empty($task)) {
            echo 'Please enter a task name';
            return;
        }

        $statement = $this->prepare('INSERT INTO tasks (task, time) VALUES (:task, :time)');
        $statement->bindValue(':task', $task);
        $statement->bindValue(':time', time());
        $statement->execute();
    }

    public function dropTable() {
        $this->query('DELETE FROM tasks');
    }

}
