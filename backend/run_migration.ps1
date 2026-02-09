$commonPaths = @(
    "C:\xampp\php\php.exe",
    "C:\php\php.exe",
    "C:\wamp64\bin\php\php8.2.12\php.exe", 
    "C:\laragon\bin\php\php-8.2.10-Win32-vs16-x64\php.exe" 
)

foreach ($path in $commonPaths) {
    if (Test-Path $path) {
        Write-Host "Found PHP at: $path"
        & $path artisan migrate
        exit 0
    }
}

# Try looser search in common roots if specific files fail
$roots = @("C:\xampp\php", "C:\php", "C:\wamp64\bin\php", "C:\laragon\bin\php")
foreach ($root in $roots) {
    if (Test-Path $root) {
        $exe = Get-ChildItem -Path $root -Filter "php.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($exe) {
             Write-Host "Found PHP at: $($exe.FullName)"
             & $exe.FullName artisan migrate
             exit 0
        }
    }
}

Write-Error "Could not find php.exe in common locations."
exit 1
