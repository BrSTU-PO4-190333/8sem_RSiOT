tex:
	docker-compose up
	docker-compose down

docker-compose-script:
	cd /app/reports

	latexmk -pdf -output-directory=/temp/ RSiOT.PO4.190333-lab5.tex

	cp /temp/*.pdf /build/
