<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set content type to JSON
header('Content-Type: application/json');

// Log file setup
$log_file = 'form_errors.log';

function log_message($message) {
    global $log_file;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($log_file, "[$timestamp] $message" . PHP_EOL, FILE_APPEND);
}

log_message("Form submission started");

// Database connection
$host = "localhost";
$username = "root";
$password = ""; 
$database = "db_portofolio";

try {
    $conn = new mysqli($host, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        log_message("Database connection failed: " . $conn->connect_error);
        echo json_encode(["status" => "error", "message" => "Koneksi database gagal: " . $conn->connect_error]);
        exit;
    }
    
    log_message("Database connection successful");

    // Process form data when form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Log received data
        log_message("POST data received: " . json_encode($_POST));
        
        // Check if required fields exist
        if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
            log_message("Missing required fields in form submission");
            echo json_encode(["status" => "error", "message" => "Data form tidak lengkap"]);
            exit;
        }

        // Sanitize inputs
        $nama = htmlspecialchars(trim($_POST['name']));
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $pesan = htmlspecialchars(trim($_POST['message']));
        $minat = isset($_POST['minat']) ? htmlspecialchars(trim($_POST['minat'])) : 'UI/UX Design';
        
        // Validate inputs
        if (empty($nama) || empty($email) || empty($pesan)) {
            log_message("Form validation failed: Empty required fields");
            echo json_encode(["status" => "error", "message" => "Semua kolom harus diisi"]);
            exit;
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            log_message("Form validation failed: Invalid email format - $email");
            echo json_encode(["status" => "error", "message" => "Format email tidak valid"]);
            exit;
        }
        
        log_message("Form validation passed, attempting database insert");
        
        try {
            // Insert data into database - matching your exact table structure
            $sql = "INSERT INTO pesan_kontak (nama, email, minat, pesan) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            
            if (!$stmt) {
                log_message("Prepare statement failed: " . $conn->error);
                echo json_encode(["status" => "error", "message" => "Database prepare error: " . $conn->error]);
                exit;
            }
            
            $stmt->bind_param("ssss", $nama, $email, $minat, $pesan);
            
            if ($stmt->execute()) {
                log_message("Database insert successful, insert ID: " . $conn->insert_id);
                echo json_encode(["status" => "success", "message" => "Pesan berhasil dikirim! Terima kasih telah menghubungi kami."]);
            } else {
                log_message("Database execute failed: " . $stmt->error);
                echo json_encode(["status" => "error", "message" => "Gagal menyimpan data: " . $stmt->error]);
            }
            
            $stmt->close();
        } catch (Exception $e) {
            log_message("Exception during database operation: " . $e->getMessage());
            echo json_encode(["status" => "error", "message" => "Terjadi kesalahan sistem: " . $e->getMessage()]);
        }
    } else {
        log_message("Invalid request method: " . $_SERVER["REQUEST_METHOD"]);
        echo json_encode(["status" => "error", "message" => "Method tidak diizinkan"]);
    }
} catch (Exception $e) {
    log_message("Critical error: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Terjadi kesalahan sistem. Silakan coba lagi nanti."]);
} finally {
    // Close connection if it exists
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>
