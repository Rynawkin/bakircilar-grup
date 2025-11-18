@echo off
REM Bakırcılar Grup - Tüm Siteleri Deploy Etme Scripti (Windows)
REM Bu script tüm siteleri sırayla Vercel'e deploy eder

echo ========================================
echo Bakircılar Grup - Toplu Site Deployment
echo ========================================
echo.

REM Ana dizini kaydet
set ROOT_DIR=%cd%

REM Sayaçlar
set SUCCESS_COUNT=0
set FAIL_COUNT=0

REM Site 1: Main (Ana Holding)
echo.
echo ================================================
echo Deploying: main (bakircilargrup.com)
echo ================================================
cd "%ROOT_DIR%\apps\main"
call vercel --prod --yes
if %ERRORLEVEL% EQU 0 (
    echo [OK] main basariyla deploy edildi!
    set /a SUCCESS_COUNT+=1
) else (
    echo [HATA] main deploy edilirken hata olustu!
    set /a FAIL_COUNT+=1
)
cd "%ROOT_DIR%"

REM Site 2: Ambalaj
echo.
echo ================================================
echo Deploying: ambalaj (bakircilarambalaj.com)
echo ================================================
cd "%ROOT_DIR%\apps\ambalaj"
call vercel --prod --yes
if %ERRORLEVEL% EQU 0 (
    echo [OK] ambalaj basariyla deploy edildi!
    set /a SUCCESS_COUNT+=1
) else (
    echo [HATA] ambalaj deploy edilirken hata olustu!
    set /a FAIL_COUNT+=1
)
cd "%ROOT_DIR%"

REM Site 3: Yazılım
echo.
echo ================================================
echo Deploying: yazilim (bakircilaryazilim.com)
echo ================================================
cd "%ROOT_DIR%\apps\yazilim"
call vercel --prod --yes
if %ERRORLEVEL% EQU 0 (
    echo [OK] yazilim basariyla deploy edildi!
    set /a SUCCESS_COUNT+=1
) else (
    echo [HATA] yazilim deploy edilirken hata olustu!
    set /a FAIL_COUNT+=1
)
cd "%ROOT_DIR%"

REM Site 4: Danışmanlık
echo.
echo ================================================
echo Deploying: danismanlik (bakircilardanismanlik.com)
echo ================================================
cd "%ROOT_DIR%\apps\danismanlik"
call vercel --prod --yes
if %ERRORLEVEL% EQU 0 (
    echo [OK] danismanlik basariyla deploy edildi!
    set /a SUCCESS_COUNT+=1
) else (
    echo [HATA] danismanlik deploy edilirken hata olustu!
    set /a FAIL_COUNT+=1
)
cd "%ROOT_DIR%"

REM Site 5: Emlak
echo.
echo ================================================
echo Deploying: emlak (bakircilaremlak.com)
echo ================================================
cd "%ROOT_DIR%\apps\emlak"
call vercel --prod --yes
if %ERRORLEVEL% EQU 0 (
    echo [OK] emlak basariyla deploy edildi!
    set /a SUCCESS_COUNT+=1
) else (
    echo [HATA] emlak deploy edilirken hata olustu!
    set /a FAIL_COUNT+=1
)
cd "%ROOT_DIR%"

REM Site 6: Otomotiv
echo.
echo ================================================
echo Deploying: otomotiv (bakircilaroto.com)
echo ================================================
cd "%ROOT_DIR%\apps\otomotiv"
call vercel --prod --yes
if %ERRORLEVEL% EQU 0 (
    echo [OK] otomotiv basariyla deploy edildi!
    set /a SUCCESS_COUNT+=1
) else (
    echo [HATA] otomotiv deploy edilirken hata olustu!
    set /a FAIL_COUNT+=1
)
cd "%ROOT_DIR%"

REM Özet
echo.
echo ========================================
echo Deployment Ozeti
echo ========================================
echo Basarili: %SUCCESS_COUNT%
echo Basarisiz: %FAIL_COUNT%
echo.

REM Sonraki adımlar
echo Sonraki Adimlar:
echo 1. Vercel Dashboard'da deployment durumlarini kontrol edin
echo 2. Domain DNS ayarlarini yapin
echo 3. SSL sertifikalarinin aktif oldugunu kontrol edin
echo 4. Siteleri test edin
echo.

if %FAIL_COUNT% EQU 0 (
    echo Tum siteler basariyla deploy edildi!
    exit /b 0
) else (
    echo Bazi siteler deploy edilemedi. Lutfen hatalari kontrol edin.
    exit /b 1
)
