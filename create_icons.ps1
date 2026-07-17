Add-Type -AssemblyName System.Drawing

function Create-Icon {
    param([int]$Size, [string]$Path)
    
    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    
    $color1 = [System.Drawing.Color]::FromArgb(26, 95, 122)
    $color2 = [System.Drawing.Color]::FromArgb(10, 61, 82)
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point($Size, $Size)),
        $color1, $color2
    )
    
    $g.FillRectangle($bgBrush, 0, 0, $Size, $Size)
    
    $goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 191, 36))
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    
    $bigFont = New-Object System.Drawing.Font("Arial", [math]::Floor($Size * 0.38), [System.Drawing.FontStyle]::Bold)
    $smallFont = New-Object System.Drawing.Font("Arial", [math]::Floor($Size * 0.12), [System.Drawing.FontStyle]::Bold)
    
    $g.DrawString([char]0x0623, $bigFont, $goldBrush, [float]($Size * 0.15), [float]($Size * 0.12))
    
    $g.DrawString("أذكاري", $smallFont, $whiteBrush, [float]($Size * 0.2), [float]($Size * 0.62))
    
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created: $Path"
}

Create-Icon -Size 192 -Path "icons\icon-192.png"
Create-Icon -Size 512 -Path "icons\icon-512.png"
