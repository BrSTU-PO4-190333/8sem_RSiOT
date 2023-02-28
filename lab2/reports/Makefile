tex:
	docker-compose up
	docker-compose down

docker-compose-script:
	cd /app

	latexmk -pdf -output-directory=/temp/ RSiOT.PO4.190333-lab2.tex

	cp /temp/*.pdf /build/
