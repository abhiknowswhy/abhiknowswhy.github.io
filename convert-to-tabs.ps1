# PowerShell script to convert spaces to tabs
Get-ChildItem -Path . -Include *.tsx,*.ts,*.js,*.jsx,*.css,*.json,*.html -Recurse -File | 
Where-Object { .FullName -notmatch 'node_modules|\.git|dist|build' } |
ForEach-Object {
    Write-Host "Processing: "
     = Get-Content .FullName -Raw
    if () {
        # Convert 2 spaces to 1 tab, then 4 spaces to 1 tab (handles different indentation levels)
         =  -replace '  ', "	"
        # Handle cases where there might be 4 spaces
         =  -replace '    ', "	"
        Set-Content -Path .FullName -Value  -NoNewline
    }
}
Write-Host "Conversion completed!"
