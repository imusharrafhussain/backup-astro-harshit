$assetsDir = "a:\AstroBharatAI\Dr_Harshit\Aacharya-website\client\src\assets"
$deleted = 0
$skipped = 0

Get-ChildItem -Path $assetsDir -Recurse -Include "*.jpg","*.jpeg","*.png" | ForEach-Object {
    $original = $_.FullName
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($original)
    $dir = [System.IO.Path]::GetDirectoryName($original)
    $webpPath = Join-Path $dir "$baseName.webp"
    if (Test-Path $webpPath) {
        try {
            Remove-Item -Path $original -Force -ErrorAction Stop
            Write-Host "DELETED $($_.Name)"
            $script:deleted++
        } catch {
            Write-Host "LOCKED  $($_.Name)"
            $script:skipped++
        }
    } else {
        Write-Host "SKIP    $($_.Name) no webp"
        $script:skipped++
    }
}

Write-Host "Deleted: $deleted  Skipped: $skipped"
