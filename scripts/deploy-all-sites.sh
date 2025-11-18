#!/bin/bash

# Bakırcılar Grup - Tüm Siteleri Deploy Etme Scripti
# Bu script tüm siteleri sırayla Vercel'e deploy eder

echo "🚀 Bakırcılar Grup - Toplu Site Deployment"
echo "=========================================="
echo ""

# Renk kodları
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Siteler dizisi
declare -a sites=(
    "main:bakircilargrup.com"
    "ambalaj:bakircilarambalaj.com"
    "yazilim:bakircilaryazilim.com"
    "danismanlik:bakircilardanismanlik.com"
    "emlak:bakircilaremlak.com"
    "otomotiv:bakircilaroto.com"
)

# Ana dizini kaydet
ROOT_DIR=$(pwd)

# Başarılı ve başarısız deploymentları takip et
SUCCESS_COUNT=0
FAIL_COUNT=0
declare -a FAILED_SITES

# Her site için deploy
for site_info in "${sites[@]}"; do
    IFS=':' read -r site_name domain <<< "$site_info"

    echo ""
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}📦 Deploying: ${site_name} (${domain})${NC}"
    echo -e "${BLUE}================================================${NC}"

    # Site klasörüne git
    cd "${ROOT_DIR}/apps/${site_name}" || {
        echo -e "${RED}❌ Klasör bulunamadı: apps/${site_name}${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        FAILED_SITES+=("${site_name}")
        continue
    }

    # Vercel deploy
    echo -e "${YELLOW}⏳ Deploying to Vercel...${NC}"

    if vercel --prod --yes; then
        echo -e "${GREEN}✅ ${site_name} başarıyla deploy edildi!${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        echo -e "${RED}❌ ${site_name} deploy edilirken hata oluştu!${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        FAILED_SITES+=("${site_name}")
    fi

    # Ana dizine dön
    cd "${ROOT_DIR}"
done

# Özet
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}📊 Deployment Özeti${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✅ Başarılı: ${SUCCESS_COUNT}${NC}"
echo -e "${RED}❌ Başarısız: ${FAIL_COUNT}${NC}"
echo ""

if [ ${FAIL_COUNT} -gt 0 ]; then
    echo -e "${RED}Başarısız siteler:${NC}"
    for failed_site in "${FAILED_SITES[@]}"; do
        echo -e "${RED}  - ${failed_site}${NC}"
    done
    echo ""
fi

# İstatistikler
echo -e "${BLUE}🎯 Sonraki Adımlar:${NC}"
echo "1. Vercel Dashboard'da deployment durumlarını kontrol edin"
echo "2. Domain DNS ayarlarını yapın"
echo "3. SSL sertifikalarının aktif olduğunu kontrol edin"
echo "4. Siteleri test edin"
echo ""

if [ ${SUCCESS_COUNT} -eq ${#sites[@]} ]; then
    echo -e "${GREEN}🎉 Tüm siteler başarıyla deploy edildi!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Bazı siteler deploy edilemedi. Lütfen hataları kontrol edin.${NC}"
    exit 1
fi
